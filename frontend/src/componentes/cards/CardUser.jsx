import React from "react";

export default function CardUser({ nombre, apellido }) {
    return (
        <article className="flex justify-center gap-3 py-5">
            <h2>{nombre}</h2>
            <h2>{apellido}</h2>
        </article>
    )
}