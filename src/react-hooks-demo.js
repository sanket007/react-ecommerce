import React, { useState, useEffect } from "react";

const ReactHooks = () => {
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${searchString}`
      );
      console.log(await response.json());
    };
    if (searchString.length > 0) {
      asyncFunc();
    }
  }, [searchString]);

  return (
    <div>
      <input
        type="text"
        onChange={event => setSearchString(event.target.value)}
      />
      <p>Search Value is : {searchString}</p>
    </div>
  );
};

export default ReactHooks;
