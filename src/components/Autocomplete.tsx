import { ReactNode, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface Option {
  id: string;
  label: string;
}

interface AutocompleteProps {
  options: Array<Option>;     
  isLoading: Boolean;
  onSelectOption: Function;
  onSearch: Function;
}

export const AutoComplete: React.FC<AutocompleteProps> = (props) => {
  const { onSearch, options, isLoading, onSelectOption } = props;

  const [searchTerms, setSearchTerms] = useState('');
  const [isShown, setShown] = useState(false);

  const onTermsChange = useCallback((e) => {
    setSearchTerms(e.target.value);
  }, []);

  const debouncedSearch = useCallback(
    debounce((terms) => {
      onSearch(terms);
    }, 800),
    [onSearch]
  );

  const renderOptions = useCallback((): ReactNode => {
    if (isLoading) return <>Loading...</>;
    if (!options.length) return <>There is no options</>;

    return options.map(({ id, label }: Option) => (
      <div
        key={id}
        onMouseDown={() => {
          onSelectOption({ id, label });
          setSearchTerms(label);
        }}
      >
        {label}
      </div>
    ));
  }, [options, isLoading, onSelectOption]);

  const toggleShown = useCallback(() => setShown((previuos) => !previuos), []);

  useEffect(() => debouncedSearch(searchTerms), [searchTerms]);

  return (
    <div className="autocomplete">
      <input
        value={searchTerms}
        onChange={onTermsChange}
        onFocus={toggleShown}
        onBlur={toggleShown}
      />
      {isShown && <div className="autocomplete-menu">{renderOptions()}</div>}
    </div>
  );
};
