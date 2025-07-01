import { useTranslation } from 'react-i18next';
import { Examples } from '~/components/demo/Examples';

export default function Screen() {
  useTranslation();
  return <Examples />;
}
