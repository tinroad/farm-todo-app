import { Switch, useColorMode, FormLabel } from "@chakra-ui/react";
function ThemeToggler({ showLabel = false, ...rest }) {
	const { toggleColorMode, colorMode } = useColorMode();
	return (
		<>
			{showLabel && (
				<FormLabel htmlFor='theme-toggler' mb={0}>
					{colorMode === "light" && <>Enable Dark Theme</>}
					{colorMode === "dark" && <>Enable Light Theme</>}
				</FormLabel>
			)}
			<Switch
				id='theme-toggler'
				size='sm'
				isChecked={colorMode === "dark"}
				isDisabled={false}
				value={colorMode}
				colorScheme='blue'
				mr={2}
				onChange={toggleColorMode}
				{...rest}
			></Switch>
		</>
	);
}

export default ThemeToggler;
