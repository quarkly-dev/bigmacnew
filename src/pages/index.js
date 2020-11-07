import React from "react";
import theme from "theme";
import { Theme, Link, Text, Image, Box } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { Override } from "@quarkly/components";
import * as Components from "components";
export default (() => {
	return <Theme theme={theme}>
		<Helmet>
			<title>
				Quarkly export
			</title>
			<meta name={"description"} content={"Web site created using quarkly.io"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/readme/cra/favicon-32x32.ico"} type={"image/x-icon"} />
		</Helmet>
		<Box quarkly-title="Header">
			<Text>
				BigMaconomics
			</Text>
			<Text>
				Shows how many BigMacs you can buy on your salary in different countries at different times
			</Text>
			<Image width="64px" height="64px" src="https://uploads.quarkly.io/5f730004864724001fc89f3f/images/burger-illustration.png?v=2020-10-09T08:32:38.484Z" />
		</Box>
		<Box quarkly-title="Content">
			<Components.App padding="0px 0px 32px 0px">
				<Override slot="card-0">
					<Override slot="Card Country Name" />
				</Override>
				<Override slot="Range">
					<Override slot="Range" />
				</Override>
			</Components.App>
		</Box>
		<Box quarkly-title="Footer">
			<Link href="#">
				<Text>
					Data from
				</Text>
				<Image width="64px" height="64px" src="https://avatars2.githubusercontent.com/u/33934691?s=200&v=4" />
				<Text>
					The Economist
				</Text>
			</Link>
			<Link href="#">
				<Text>
					About Big Mac Index
				</Text>
			</Link>
			<Link href="#">
				<Text>
					Made on{" "}
				</Text>
				<Image width="64px" height="64px" src="https://uploads.quarkly.io/5f730004864724001fc89f3f/images/logo-on-light.svg?v=2020-10-08T07:10:58.147Z" />
			</Link>
		</Box>
		<Link
			font={"--capture"}
			font-size={"10px"}
			position={"fixed"}
			bottom={"12px"}
			right={"12px"}
			z-index={"4"}
			border-radius={"4px"}
			padding={"5px 12px 4px"}
			background-color={"--dark"}
			opacity={"0.6"}
			hover-opacity={"1"}
			color={"--light"}
			cursor={"pointer"}
			transition={"--opacityOut"}
			quarkly-title={"Badge"}
			text-decoration-line={"initial"}
			href={"https://quarkly.io/"}
			target={"_blank"}
		>
			Made on Quarkly
		</Link>
	</Theme>;
});