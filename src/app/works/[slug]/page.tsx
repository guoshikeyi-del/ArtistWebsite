import WorkDetailPage from "@/components/WorkDetailPage";
import works from "@/data/works.json";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => <WorkDetailPage slug={slug} />);
}
