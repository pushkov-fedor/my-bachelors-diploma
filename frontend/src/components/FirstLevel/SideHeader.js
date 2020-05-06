import React from "react";

export function SideHeader() {
  const headers = [
    { title: "", size: 1 },
    { title: "Объём потребления", size: 1 },
    { title: "Границы", size: 3 },
  ];
  const content = headers.map(({ title, size }, index) => (
    <div
      style={{ width: "150px", height: `${size * 100}px` }}
      key={title + index}
      className="border d-flex align-items-center justify-content-center text-center"
    >
      {title}
    </div>
  ));
  return <div>{content}</div>;
}
