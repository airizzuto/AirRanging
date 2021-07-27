import Select from 'react-select';

/* React select documentation https://react-select.com/home */

interface Options {
  value: string;
  label: string;
}

const SelectDropdown = (options: Options[]) => {
  // TODO: styling
  
  return (
    <div>
      <Select options={options} />
    </div>
  );
};

export default SelectDropdown;
