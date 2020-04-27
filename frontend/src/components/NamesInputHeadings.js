import React, { useState, useEffect } from "react";

export function NamesInputHeadings(props) {
  const [headingsRaw, setHeadingsRaw] = useState("");

  useEffect(() => {
    setHeadingsRaw(
      props.headings
        .map((h) => (h.id === undefined ? h.name : `${h.id}:${h.name}`))
        .join("\t")
    );
  }, [props.headings.map((h) => h.name).join("")]);

  useEffect(() => {
    props.setHeadings(
      headingsRaw
        .trim()
        .split(/\s+/)
        .map((heading) => {
          const [left, right] = heading.split(":");
          return right === undefined
            ? { id: undefined, name: left }
            : { id: left, name: right };
        })
    );
  }, [headingsRaw]);
  return (
    <textarea
      className="w-100"
      value={headingsRaw}
      onChange={(e) => setHeadingsRaw(e.target.value)}
      row="1"
    />
  );
}
