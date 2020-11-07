import React from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Text } from '@quarkly/widgets';
const overrides = {
	'Empty': {
		kind: 'Box'
	},
	'Empty Text': {
		kind: 'Text'
	}
};

const Empty = ({
	name,
	year,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	return <Box {...rest} {...override('Empty')}>
		      
		<Text {...override('Empty Text')}>
			        
			{override('Empty Text').children || `No data on ${name} for ${year}`}
			      
		</Text>
		    
	</Box>;
};

export default Object.assign(Empty, {
	title: 'Empty'
});