import React from 'react';
import atomize from '@quarkly/atomize';
import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';
const Label = atomize.label();
const Select = atomize.select();
const Option = atomize.option();
const overrides = {
	'Filter': {
		kind: 'Box'
	},
	'Filter Label': {
		kind: 'Box'
	},
	'Filter Select': {
		kind: 'Box'
	}
};

const MyFilter = ({
	defaultValue,
	updateValue,
	options,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const platform = window.navigator.platform,
	      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
	      isWindows = windowsPlatforms.indexOf(platform) !== -1;
	return <Box align-items="center" display="flex" {...rest} {...override('Filter')}>
		      
		<Label for="filter" {...override('Filter Label')}>
			        
			{override('Filter Label').children || 'Show:'}
			      
		</Label>
		      
		<Select cursor="pointer" id="filter" onChange={updateValue} {...override('Filter Select')}>
			        
			<Option value="ALL" selected={defaultValue === 'ALL'}>
				          {'All countries'}        
			</Option>
			        
			{options.map(c => <Option value={c.iso3} selected={c.iso3 === defaultValue}>
				            
				{isWindows ? c.name : `${c.flag} ${c.name}`}
				          
			</Option>)}
			      
		</Select>
		    
	</Box>;
};

export default Object.assign(MyFilter, {
	title: 'MyFilter'
});