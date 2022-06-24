import React, { useEffect, useState } from 'react';

type Category = { id: string; name: string };

type ListContextObject = {
  categories: Category[];
  addCategory: (category: string) => void;
  removeCategory: (id: string) => void;
};

export const ListContext = React.createContext<ListContextObject>({
  categories: [],
  addCategory: () => {},
  removeCategory: (id: string) => {},
});

const ListContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const initialHttp = async () => {
      const url = `https://62a31de321232ff9b218d5c8.mockapi.io/lists/`;
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);

      if (data) {
        const finalData: Category[] = [];
        for (const key in data) {
          finalData.push({ id: data[key].id, name: data[key].name });
        }
        setCategories(finalData);
      }
    };
    initialHttp();
  }, []);

  const httpRequest = async (category: { name: string }) => {
    const url = `https://62a31de321232ff9b218d5c8.mockapi.io/lists/`;

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(JSON.stringify(category));
    const data = res.json();
    console.log(data);
  };

  const addCategoryHandler = (category: string) => {
    console.log(category);
    httpRequest({ name: category });

    if (categories.length > 0) {
      setCategories((prevCategories) => {
        console.log(prevCategories);
        const dlzka = prevCategories.length + 1;
        const newCategory = {
          id: dlzka.toString(),
          name: category,
        };
        const newCategories = [...prevCategories, newCategory];

        return newCategories;
      });
    } else {
      setCategories([{ id: '1', name: category }]);
    }
  };

  const removeCategoryHandler = (idToRemove: string) => {};

  const contextValue: ListContextObject = {
    categories: categories,
    addCategory: addCategoryHandler,
    removeCategory: removeCategoryHandler,
  };

  return (
    <ListContext.Provider value={contextValue}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
