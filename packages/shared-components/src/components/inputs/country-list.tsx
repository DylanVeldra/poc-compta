import DropList from './drop-list';
import countryList from 'countries-list/dist/countries.emoji.json';
import { useLanguageDictionary } from '@shared-hooks';
import { Flag } from '../flag';

const generateCountryList = () => {
  let array: Array<{}> = [];

  let arrayOfCountriesSorted = Object.entries(countryList).sort((a, b) =>
    a[1].name > b[1].name ? 1 : b[1].name > a[1].name ? -1 : 0,
  );

  arrayOfCountriesSorted.forEach((country) => {
    if (country[0] === 'FR') {
      array.push(country);
      let index = arrayOfCountriesSorted.indexOf(country);
      arrayOfCountriesSorted.splice(index, 1);
    }
    if (country[0] === 'CH') {
      array.unshift(country);
      let index = arrayOfCountriesSorted.indexOf(country);
      arrayOfCountriesSorted.splice(index, 1);
    }
  });

  const newArray = array.concat(arrayOfCountriesSorted);

  return newArray.map((item: any) => {
    return {
      name: item[1].name,
      value: item[0],
      label: (
        <div className="flex items-center justify-between gap-[5px]">
          <div className="flex items-center">
            <Flag countryCode={item[0]} />{' '}
            <div className="ml-2">{item[1].name}</div>
          </div>{' '}
          <div className="text-right">({item[1].native})</div>
        </div>
      ),
    };
  });
};

interface CountryListProps {
  updateForm?: (v: string, x: string) => void;
  onChange?: (v: string, x: string) => void;
  label: string;
  currentValue?: string;
  disabled?: boolean;
  marginTop?: number;
  values?: any;
  errors?: any;
}
export default function CountryList(props: CountryListProps) {
  const dict = useLanguageDictionary();
  const countries = generateCountryList();

  const onCountryChange = (v: string) => {
    if (!v) return;

    if (props.updateForm) {
      props.updateForm('taxResidenceCountry', v);
    }

    props.onChange?.('taxResidenceCountry', v);
  };

  return (
    <DropList
      list={countries}
      defaultValue="FR"
      name="taxResidenceCountry"
      onChange={onCountryChange}
      label={props.label}
      currentValue={props.currentValue}
      disabled={props.disabled}
      marginTop={props.marginTop}
      placeholder={dict.registerFields.taxCountryPlaceholder}
      errors={props.errors}
      searchInput={true}
      filterKey={'name'}
    />
  );
}
