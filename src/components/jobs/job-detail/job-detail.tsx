import { useJobQuery } from "../../../api/jobs/get-job";

export function JobDetail() {
  const { data, isLoading, error }: any = useJobQuery(56);

  if (!data) {
    return null;
  }
  console.log("DATA", data);

  return (
    <div className="pb-32">
      <header>
        <img src={data.header_image_url} />
      </header>
      <main className="py-4 px-8">
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
        <button className="bg-slate-300 rounded-md w-8 h-8 p-8">Aplikuj</button>
      </main>
      <footer>
        {data.footer}
        <a href={data.footer}>{data.brand?.name}</a>
      </footer>
    </div>
  );
}
