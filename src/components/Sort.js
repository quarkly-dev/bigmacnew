import React from 'react';
import atomize from '@quarkly/atomize';
import { useOverrides } from '@quarkly/components';
import { Box, Icon } from '@quarkly/widgets';
import { MdArrowUpward } from "react-icons/md";
const Label = atomize.label();
const Select = atomize.select();
const Option = atomize.option();
const overrides = {
	'Sort': {
		kind: 'Box'
	},
	'Sort Label': {
		kind: 'Box'
	},
	'Sort Select': {
		kind: 'Box'
	},
	'Sort Checkbox': {
		kind: 'Box'
	},
	'Sort Direction': {
		kind: 'Icon'
	}
};

const MySort = ({
	defaultValue,
	defaultDirection,
	updateValue,
	updateDirection,
	options,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	return <Box align-items="center" display="flex" {...rest} {...override('Sort')}>
		      
		<Label htmlFor="sort" {...override('Sort Label')}>
			        
			{override('Sort Label').children || 'Sort by:'}
			      
		</Label>
		      
		<Select cursor="pointer" id="sort" onChange={updateValue} {...override('Sort Select')}>
			        
			{options.map(option => <Option value={option.value} default={option.value === defaultValue}>
				            
				{option.title}
				          
			</Option>)}
			      
		</Select>
		      
		<Icon
			transform={`scale(${defaultDirection ? '1' : '-1'})`}
			cursor="pointer"
			category="md"
			icon={MdArrowUpward}
			size="24px"
			color="--dark"
			onClick={updateDirection}
			{...override('Sort Direction')}
		/>
		    
	</Box>;
};

export default Object.assign(MySort, {
	title: 'Sort'
});