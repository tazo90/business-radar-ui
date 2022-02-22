import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Map from '@components/map';
import { useStoresQuery } from "@api/stores/get-all-stores";

export default function Home() {
  const { data, isLoading, error } = useStoresQuery({
    limit: 8
  });

  return (
    <Container>
      <Map cluster={true} locations={data} />
    </Container>
  );
}

Home.Layout = Layout;
