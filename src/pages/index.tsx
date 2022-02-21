import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Map from '@components/map';

export default function Home() {
  return (
    <Container>
      <Map cluster={true} />
    </Container>
  );
}

Home.Layout = Layout;
