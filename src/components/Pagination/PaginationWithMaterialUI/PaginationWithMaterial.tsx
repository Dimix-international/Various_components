import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {PaginationItem, Link, Pagination, Stack, TextField} from '@mui/material'

import {Link as NavLink, useParams, useNavigate} from "react-router-dom"

const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

export type HitType = {
    author: string
    comment_text: null | string
    created_at: string
    created_at_i: number
    num_comments: number
    objectID: string
    parent_id: null | string
    points: number
    story_id: null | string
    story_text: null | string
    story_title: null | string
    story_url: null | string
    title: null | string
    url: string
}
export type ResponseGetType = {
    exhaustiveNbHits: boolean
    exhaustiveTypo: boolean
    hits: Array<HitType>
    hitsPerPage: number
    nbHits: number
    nbPages: number
    page: number
    params: string
    processingTimeMS: number
    query: string
}

export type PaginationWithMaterialType = {}
export const PaginationWithMaterial: React.FC<PaginationWithMaterialType> = React.memo((props) => {

    const [posts, setPosts] = useState<Array<HitType>>([]);
    const [query, setQuery] = useState('react');//запрос пользователя

    const params = useParams();

    //const [page, setPage] = useState(1);//текущая страница
    //для сохранения страницы при ее перезагрузке изменим запись state
    const [page, setPage] = useState(parseInt(params.page ? params.page.split('=')[1] : '1'));//текущая страница

    const [pageQty, setPageQty] = useState(0); //всего страниц

    const [loader, setLoader] = useState(false);


    useEffect(() => {
        axios.get<ResponseGetType>(BASE_URL + `query=${'react'}&page=0`) // page - 1 - на этом сервисе нумерация страниц идет с 0
            .then(({data}) => {
                setPosts(data.hits);
                setPageQty(data.nbPages);
            })

    }, [])


    const navigate = useNavigate();

    useEffect(() => {
        if (loader) {
            const timer = setTimeout(() =>
                axios.get<ResponseGetType>(BASE_URL + `query=${query}&page=${page - 1}`) // page - 1 - на этом сервисе нумерация страниц идет с 0
                    .then(({data}) => {
                        setPosts(data.hits);
                        setPageQty(data.nbPages);

                        //если мы находимя на 49 странице, и делаем новый запрос, у которого 4 страницы - устанавливаем текущую страницу на 1
                        if (data.nbPages < page) {
                            setPage(1);
                            navigate('/', {replace: true}); //чтобы в поисковой строке обновилось, если страниц стало меньше
                        }
                    })
                    .finally(() => {
                        setLoader(false);
                    }), 500)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [query, page, loader, navigate])

    const showNewPage = (num: number) => {
        setLoader(true);
        setPage(num);
    }
    //вариант debounce еще один
   /* const debounceSrcDoc = useDebounced(...., 500)

    function useDebounced(value: any, ms: number) {

        let [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const timeoutId = window.setTimeout(() => {
                setDebouncedValue(value)
            }, ms)

            return () => {
                clearTimeout(timeoutId)
            }

        },[value, ms])

        return debouncedValue;
    }
*/
    return (
        <>
            <TextField
                //поисковая строка
                fullWidth
                label={'query'}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setLoader(true)
                }}
            />
            <Stack
                /*для упорядовачивания данных*/
                spacing={2}
            >
                {
                    !!setPageQty && (
                        <Pagination
                            color="secondary"
                            count={pageQty}
                            page={page}
                            onChange={(_, num) => showNewPage(num)}
                            showFirstButton
                            showLastButton
                            sx={{
                                //стили
                                marginY: 3,
                                marginX: 'auto'
                            }}
                            renderItem={(item) => (
                                //функция на базе которой идет отрисовка
                                //будем отрисовывать PaginationItem
                                <PaginationItem
                                    component={NavLink} //какой компонент используем
                                    to={`/page=${item.page}`}
                                    //теперь в поисковой строке будут появлятся параметры
                                    {...item}
                                />
                            )}
                        />
                    )
                }
                {
                    loader ? <div>Loading...</div> : posts.map(post => (
                        <Link
                            key={post.objectID}
                            href={post.url}
                        >
                            {post.title || post.story_title}
                        </Link>
                    ))
                }
            </Stack>
        </>
    )
})


