import React from "react";

export default function CardUser({ nombre, apellido }) {
    return (
        <article className="tarjeta py-5">
            <h2 className="text-2xl text-[#2D9596] uppercase pt-10 font-medium">{nombre}</h2>
            <h2 className="text-2xl text-[#2D9596] uppercase pt-10 font-medium">{apellido}</h2>
        </article>
    )
}