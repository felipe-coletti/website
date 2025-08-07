import { Heading, Text, PageWrapper } from '../../components'

export const NotFound = () => {
	return (
		<PageWrapper className='message'>
			<Heading as='h1' size='xlarge'>
				Error 404
			</Heading>
			<Heading as='h2'>Oops! Page not found</Heading>
			<Text>The page you are looking for does not exist or has been moved</Text>
		</PageWrapper>
	)
}
