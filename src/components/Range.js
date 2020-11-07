import React, { useState } from 'react';
import { useOverrides } from '@quarkly/components';
import { useTheme } from 'styled-components';
import { Range, getTrackBackground } from 'react-range';
import { Box, Text } from '@quarkly/widgets';
const overrides = {
	'Range': {
		kind: 'Box'
	},
	'Range Label': {
		kind: 'Text'
	},
	'Range Track': {
		kind: 'Box'
	},
	'Range Track Line': {
		kind: 'Box'
	},
	'Range Thumb': {
		kind: 'Box'
	},
	'Range Thumb Point': {
		kind: 'Box'
	},
	'Range Thumb Label': {
		kind: 'Box'
	},
	'Range Marks': {
		kind: 'Text'
	},
	'Range Marks Value': {
		kind: 'Text'
	},
	'Range Marks Value Min': {
		kind: 'Text'
	},
	'Range Marks Value Max': {
		kind: 'Text'
	},
	'Range Marks Point': {
		kind: 'Box'
	}
};

const MyRange = ({
	minValue,
	maxValue,
	defaultValue,
	step = 1,
	updateValue,
	...props
}) => {
	const {
		override,
		rest
	} = useOverrides(props, overrides);
	const [values, setValues] = useState([defaultValue]);
	const theme = useTheme();

	const handleChange = values => {
		setValues(values);
	};

	const handleFinalChange = values => {
		updateValue(values[0]);
	};

	return <Box width="100%" {...rest} {...override('Range')}>
		      
		<Text {...override('Range Label')}>
			        
			{override('Range Label').children || 'Year'}
			      
		</Text>
		      
		<Range
			min={minValue}
			max={maxValue}
			values={values}
			step={step}
			onChange={handleChange}
			onFinalChange={handleFinalChange}
			renderTrack={({
				props,
				children
			}) => <Box
				style={props.style}
				width="100%"
				height="40px"
				display="flex"
				onMouseDown={props.onMouseDown}
				onTouchStart={props.onTouchStart}
				{...override('Range Track')}
			>
				              
				<Box
					ref={props.ref}
					width="100%"
					height="4px"
					min-height="0"
					background={getTrackBackground({
						min: minValue,
						max: maxValue,
						colors: [theme.color.primary, theme.color.grey],
						values: values
					})}
					border-radius="4px"
					align-self="flex-end"
					{...override('Range Track Line')}
				>
					                
					{children}
					              
				</Box>
				            
			</Box>}
			renderThumb={({
				props,
				isDragged
			}) => <Box
				{...props}
				style={props.style}
				width="24px"
				height="24px"
				background-color="#FFF"
				border-radius="50%"
				outline="none"
				box-shadow={theme.boxShadow.m}
				align-items="center"
				justify-content="center"
				display="flex"
				{...override('Range Thumb')}
			>
				              
				<Box
					min-width="8px"
					min-height="8px"
					background-color={isDragged ? theme.color.primary : theme.color.grey}
					border-radius="2px"
					{...override('Range Thumb Point')}
				/>
				              
				<Box
					bottom="32px"
					padding="8px 12px"
					min-width="0"
					min-height="0"
					font-size="14px"
					font-weight="bold"
					color={theme.color.light}
					background-color={theme.color.primary}
					border-radius="4px"
					position="absolute"
					{...override('Range Thumb Label')}
				>
					                
					{values[0]}
					              
				</Box>
				            
			</Box>}
			renderMark={({
				props,
				index
			}) => <Box
				{...props}
				style={props.style}
				min-width="4px"
				min-height="12px"
				background-color={index * step < values[0] ? theme.color.primary : theme.color.grey}
				display={index === minValue || index === maxValue ? 'block' : 'none'}
				{...override('Range Marks Point')}
			/>}
		/>
		        
		<Box margin="16px -2px 0px" justify-content="space-between" display="flex" {...override('Range Marks')}>
			          
			<Text margin="0" {...override('Range Marks Value', 'Range Marks Value Min')}>
				            
				{override('Range Marks Value Min').children || minValue}
				          
			</Text>
			          
			<Text margin="0" {...override('Range Marks Value', 'Range Marks Value Max')}>
				            
				{override('Range Marks Value Max').children || maxValue}
				          
			</Text>
			        
		</Box>
		    
	</Box>;
};

export default Object.assign(MyRange, {
	title: 'Range',
	overrides
});