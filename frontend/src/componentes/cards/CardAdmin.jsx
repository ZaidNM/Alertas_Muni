import React from "react";

export default function CardAdmin({ nombre, apellido, dni, correo, nacimiento, celular, tipo }) {
    return (
        <article className="py-5 text-left">
            <h2 className="text-center">{nombre} {apellido}</h2>
            <dl className="mt-4 space-y-2 text-sm normal-case">
                <div><dt className="inline font-semibold">DNI: </dt><dd className="inline">{dni}</dd></div>
                <div><dt className="inline font-semibold">Correo: </dt><dd className="inline break-words">{correo}</dd></div>
                <div><dt className="inline font-semibold">Nacimiento: </dt><dd className="inline">{nacimiento}</dd></div>
                <div><dt className="inline font-semibold">Celular: </dt><dd className="inline">{celular}</dd></div>
                <div><dt className="inline font-semibold">Tipo: </dt><dd className="inline">{tipo}</dd></div>
            </dl>
        </article>
    )
}