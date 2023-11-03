import { Box, Center, Divider, HStack, Heading, VStack } from '@yamada-ui/react'
import { FC, PropsWithChildren } from 'react'
import { StarBanner } from 'components/feedback'
import { Footer, Header, Sidebar } from 'components/layouts'
import { SEO } from 'components/media-and-icons'
import {
  TableOfContents,
  Pagination,
  Breadcrumb,
  Tabs,
  LinkCards,
  EditPageLink,
  RelatedLinks,
} from 'components/navigation'
import { TextWithCode } from 'components/typography'
import { DocumentData, DocumentTypes } from 'contentlayer/generated'
import { usePage } from 'contexts/page-context'

export type DocumentLayoutProps = PropsWithChildren<DocumentTypes & DocumentData>

export const DocumentLayout: FC<DocumentLayoutProps> = ({
  title,
  description,
  editUrl,
  with_table_of_contents,
  with_description,
  with_children,
  with_children_description,
  contents,
  children,
}) => {
  const { documentChildrenTree } = usePage()

  return (
    <>
      <SEO title={title} description={description} />

      <StarBanner />

      <Header />

      <Center as='main'>
        <HStack alignItems='flex-start' w='full' maxW='9xl' gap='0' px={{ base: 'lg', md: 'md' }}>
          <Sidebar display={{ base: 'flex', lg: 'none' }} />

          <VStack flex='1' minW='0' gap='0' py={{ base: 'lg', md: 'normal' }}>
            <Breadcrumb />

            <Heading as='h1' size='2xl'>
              {title}
            </Heading>

            {with_description ? <TextWithCode mt='6'>{description}</TextWithCode> : null}

            <RelatedLinks />

            <Tabs />

            <Box>
              {children}

              {with_children && documentChildrenTree.length ? (
                <>
                  <Divider mt='xl' />

                  <LinkCards with_description={with_children_description} />

                  <Divider mt='xl' />
                </>
              ) : null}

              <EditPageLink href={editUrl} />

              <Pagination />
            </Box>
          </VStack>

          {with_table_of_contents && contents.length ? (
            <TableOfContents display={{ base: 'flex', xl: 'none' }} contents={contents} />
          ) : null}
        </HStack>
      </Center>

      <Footer />
    </>
  )
}
