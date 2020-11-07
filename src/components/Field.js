import React from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Text, Icon, Input } from '@quarkly/widgets';
import { FaDollarSign } from "react-icons/fa";
const overrides = {
	'Input': {
		kind: 'Box'
	},
	'Input Label': {
		kind: 'Text'
	},
	'Input Input': {
		kind: 'Input'
	},
	'Input Icon': {
		kind: 'Icon'
	}
};

const MyInput = ({
	defaultValue,
	updateValue,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);

	const handleChange = value => {
		updateValue(value);
	};

	return <Box position="relative" {...rest}>
		      
		<Text {...override('Input Label')}>
			        
			{override('Input Label').children || 'Your salary'}
			      
		</Text>
		      
		<Input
			padding-left="24px"
			type="number"
			defaultValue={defaultValue}
			onChange={handleChange}
			{...override('Input Input')}
		/>
		      
		<Icon
			bottom="0px"
			left="6px"
			height="40px"
			line-height="40px"
			position="absolute"
			category="fa"
			icon={FaDollarSign}
			size="16px"
			color="--dark"
			{...override('Input Icon')}
		/>
		    
	</Box>;
};

export default Object.assign(MyInput, {
	title: 'Input',
	overrides
});