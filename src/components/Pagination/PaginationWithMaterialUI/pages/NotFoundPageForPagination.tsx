import React from "react";

type NotFoundPageForPaginationType = {}
export const NotFoundPageForPagination: React.FC<NotFoundPageForPaginationType> = React.memo(
    (props) => {
        return (
            <div>
                Page doesn't exist!
            </div>
        )
    })