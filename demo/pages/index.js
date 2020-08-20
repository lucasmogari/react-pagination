import usePagination from '@lucasmogari/react-pagination';

export default function Home() {
  const pagination = usePagination({});
  return <div className="">{JSON.stringify(pagination)}</div>;
}
