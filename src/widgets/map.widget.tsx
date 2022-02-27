import { withWidget } from './builder/with-widget';
import Container from "../components/ui/container";
import Map from '../components/map';
import { useStoresQuery } from "../api/stores/get-all-stores";

function MapWidget(props) {
  const { data, isLoading, error } = useStoresQuery({
    brand: 'kfc',
    country: 'pl',
  });

  return (
    <Container>
      <Map cluster={true} locations={data} />
    </Container>
  );
}

export default withWidget('map', MapWidget);
