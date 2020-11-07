import React from 'react';
import atomize from "@quarkly/atomize";
import { useOverrides } from '@quarkly/components';
import { Box, Text } from '@quarkly/widgets';
const Span = atomize.span();
const overrides = {
	'Card': {
		kind: 'Box'
	},
	'Card :even': {
		kind: 'Box'
	},
	'Card :odd': {
		kind: 'Box'
	},
	'Card Header': {
		kind: 'Box'
	},
	'Card Content': {
		kind: 'Box'
	},
	'Card Footer': {
		kind: 'Box'
	},
	'Card Country Flag': {
		kind: 'Box'
	},
	'Card Country Flag :windows': {
		kind: 'Box',
		props: {
			opacity: '.5'
		}
	},
	'Card Country Name': {
		kind: 'Text'
	},
	'Card List': {
		kind: 'Box'
	},
	'Card Item Last': {
		kind: 'Box'
	},
	'Card Item Hide': {
		kind: 'Box'
	},
	'Card Price': {
		kind: 'Box'
	},
	'Card Price Descr': {
		kind: 'Text'
	},
	'Card Price Value': {
		kind: 'Box'
	},
	'Card Total': {
		kind: 'Box'
	},
	'Card Total Descr': {
		kind: 'Text'
	},
	'Card Total Value': {
		kind: 'Box'
	}
};
const maxBurgers = 100;

const Card = ({
	income,
	country,
	index,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const platform = window.navigator.platform,
	      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
	      isWindows = windowsPlatforms.indexOf(platform) !== -1,
	      number = income / country.dollarPrice;
	let burgers;

	if (number < maxBurgers) {
		burgers = '🍔 '.repeat(Math.floor(number));
	} else {
		burgers = `🍔  × ${Math.floor(number)}`;
	}

	return <Box {...rest} {...override('Card', `Card :${index % 2 ? 'even' : 'odd'}`)}>
		      
		<Box {...override('Card Header')}>
			        
			<Box {...override('Card Country')}>
				          
				<Span {...override('Card Country Flag', isWindows && `Card Country Flag :windows`)}>
					            
					{country.flag}
					          
				</Span>
				          
				<Span title={country.name} {...override('Card Country Name')}>
					            
					{country.name}
					          
				</Span>
				        
			</Box>
			      
		</Box>
		      
		<Box {...override('Card Content')}>
			        
			<Box {...override('Card List')}>
				          
				<Span role="img" aria-label="burger">
					{burgers}
				</Span>
				          
          
				<Span display={number < maxBurgers ? 'block' : 'none'} {...override('Card Item Last')}>
					            
					<Span role="img" aria-label="burger">
						{'🍔 '}
					</Span>
					            
					<Span left={`${number % 1 * 100}%`} {...override('Card Item Hide')} />
					          
				</Span>
				        
			</Box>
			      
		</Box>
		      
		<Box {...override('Card Footer')}>
			        
			<Box {...override('Card Total')}>
				          
				<Text {...override('Card Total Descr')}>
					            
					{override('Card Total Descr').children || 'total:'}
					          
				</Text>
				          
				<Span {...override('Card Total Value')}>
					            
					{number.toFixed(1)}
					          
				</Span>
				        
			</Box>
			        
			<Box {...override('Card Price')}>
				          
				<Text {...override('Card Price Descr')}>
					            
					{override(`Card Price Descr`).children || 'each for'}
					          
				</Text>
				          
				<Span {...override('Card Price Value')}>
					            
					{'$' + country.dollarPrice.toFixed(2)}
					          
				</Span>
				        
			</Box>
			      
		</Box>
		    
	</Box>;
};

export default Object.assign(Card, {
	title: 'Card Title'
});