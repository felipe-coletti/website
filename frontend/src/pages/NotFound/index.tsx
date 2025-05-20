import { Heading, Text, PageWrapper } from '../../components'

export const NotFound = () => {
	return (
		<PageWrapper className='message'>
			<Heading size='xlarge'>404</Heading>
			<Text>Page Not Found</Text>
		</PageWrapper>
	)
}
