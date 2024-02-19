type Item = {
  _id: string;
  title: string;
  content: string;
};

interface initData {
  items: Item[];
  isLoading: false;
  error: null | string;
}

export const initialData: initData = {
  items: [],
  isLoading: false,
  error: null,
};
