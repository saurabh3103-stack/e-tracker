import React from "react";

const Brandcrump = ({ pageName, title, url, breadcrumb }) => {
    return (
        <>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">{title}</h6>
                <ul className="d-flex align-items-center gap-2">
                    <li className="fw-medium">
                        <a href={url} className="d-flex align-items-center gap-1 hover-text-primary">
                            <iconify-icon icon="solar:home-smile-angle-outline" className="icon text-lg"></iconify-icon>
                            {pageName}
                        </a>
                    </li>
                    {breadcrumb && (
                        <>
                        <li>-</li>
                        <li className="fw-medium">{breadcrumb}</li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Brandcrump;
