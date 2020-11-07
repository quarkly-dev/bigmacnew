import React, { useState, useCallback, useMemo } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';
import getData from './Data';
import Input from './Field';
import Range from './Range';
import Filter from './Filter';
import Sort from './Sort';
import Card from './Card';
import Empty from './Empty';
const overrides = {
	'Basic options': {
		kind: 'Box'
	},
	'Other options': {
		kind: 'Box'
	},
	'Content': {
		kind: 'Box'
	}
};
const defaults = {
	minYear: 1986,
	maxYear: 2020,
	curYear: 2020,
	income: 100,
	filter: 'ALL',
	sort: 'name',
	direction: false,
	filterOptions: [],
	sortOptions: [{
		title: 'Country',
		value: 'name'
	}, {
		title: 'Price',
		value: 'price'
	}]
};

const parseData = data => {
	const dataArr = data.split('\n');
	const headers = dataArr.shift().split(',');
	return dataArr.map(item => {
		const itemArr = item.split(',');
		const itemObj = {};
		itemArr.forEach((value, index) => {
			const key = headers[index].trim();
			const val = value.trim();

			if (val) {
				if (index === 5 || index > 6) {
					itemObj[key] = Number(val);
				} else {
					itemObj[key] = val;
				}
			}
		});
		return itemObj;
	});
};

const App = props => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const allCountries = parseData(getData());
	const [countries, setCountries] = useState(allCountries ? allCountries.filter(c => c.year === defaults.curYear) : []);
	const [income, setIncome] = useState(defaults.income);
	const [year, setYear] = useState(defaults.curYear);
	const [filter, setFilter] = useState(defaults.filter);
	const [sort, setSort] = useState(defaults.sort);
	const [direction, setDirection] = useState(defaults.direction);

	const handleChangeIncome = e => setIncome(e.target.value);

	const handleChangeYear = year => setYear(year);

	const handleChangeFilter = e => setFilter(e.target.value);

	const handleChangeSort = e => setSort(e.target.value);

	const handleChangeDirection = useCallback(() => setDirection(!direction), [direction]);
	useMemo(() => {
		let sortFunction = () => {};

		if (sort === 'name' && direction) {
			sortFunction = (i1, i2) => i2.name.localeCompare(i1.name);
		} else if (sort === 'name' && !direction) {
			sortFunction = (i1, i2) => i1.name.localeCompare(i2.name);
		} else if (sort === 'price' && direction) {
			sortFunction = (i1, i2) => i2.dollarPrice - i1.dollarPrice;
		} else if (sort === 'price' && !direction) {
			sortFunction = (i1, i2) => i1.dollarPrice - i2.dollarPrice;
		}

		defaults.filterOptions = [].concat(allCountries.find(c => c.iso3 === filter) || [], allCountries.filter(c => c.year === year && c.iso3 !== filter)).map(c => ({
			name: c.name,
			flag: c.flag,
			iso3: c.iso3
		}));

		if (filter === 'ALL') {
			setCountries(allCountries ? allCountries.filter(c => c.year === year).sort(sortFunction) : []);
		} else {
			setCountries(allCountries ? allCountries.filter(c => c.year === year && c.iso3 === filter) : []);
		}
	}, [year, filter, sort, direction]);
	return <Box {...rest}>
		<Box {...override('Basic options')}>
			<Input defaultValue={income} updateValue={handleChangeIncome} {...override('Input')} />
			<Range
				minValue={defaults.minYear}
				maxValue={defaults.maxYear}
				defaultValue={year}
				updateValue={handleChangeYear}
				step={1}
				{...override('Range')}
			/>
		</Box>
		<Box {...override('Other options')}>
			<Sort
				defaultValue={sort}
				defaultDirection={direction}
				updateValue={handleChangeSort}
				updateDirection={handleChangeDirection}
				options={defaults.sortOptions}
				{...override('Sort')}
			/>
			<Filter defaultValue={filter} updateValue={handleChangeFilter} options={defaults.filterOptions} {...override('Filter')} />
		</Box>
		<Box {...override('Content')}>
			{countries.length ? countries.map((country, index) => <Card {...override('Card', `Card-${index}`)} income={income} country={country} index={index} />) : <Empty name={allCountries.find(c => c.iso3 === filter).name} year={year} {...override('Empty')} />}
		</Box>
		    
	</Box>;
};

export default Object.assign(App, {
	title: 'App Title',
	description: {
		en: "App Description"
	},
	overrides
});