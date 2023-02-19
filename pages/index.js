import Image from "next/image"
import Link from "next/link"
import { baseUrl, fetchApi } from "../utils/fetchApi"
import Property from "../components/Property"

import { Flex, Box, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"


const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => (
<Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
  <Image src={imageUrl}  width={500} height={300} alt="banner"/>
  <Box p="5" >
    <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
    <Text  fontSize="3xl" fontWeight="bold">{title1}<br/>{title2}</Text>
    <Text color="gray.700" fontSize="lg" paddingTop="3" paddingBottom="3">{desc1}<br/>{desc2}</Text>
    <Button fontSize="xl" bg="blue.300" color="white">
      <Link href={linkName}>{buttonText}</Link>
    </Button>
  </Box>
</Flex>
)

export default function Home({propertiesForRent, propertiesForSale}) {
  console.log(propertiesForRent)
  console.log(propertiesForSale)
  
  return (
    <Box className="container">
        <Banner 
          purpose="BUY A HOME" title1="Find, Buy & Own Your" title2="Dream Home"
          desc1="Explore Apartments, Villas, Homes, Villas, Homes" desc2="and more"
          buttonText="Explore Buying" linkName={`/search?purpose=for-sale`} 
          imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg"
        />
        <Flex flexWrap='wrap'>
          {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
        </Flex>

        <Banner 
          purpose="RENT A HOME" title1="Rental Homes for" title2="Everyone"
          desc1="Explore Apartments, Villas, Homes" desc2="and more"
          buttonText="Explore Renting" linkName={`/search?purpose=for-rent`} 
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />
        <Flex flexWrap='wrap'>
          {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
      
    </Box>
  )
}



export async function getStaticProps() {
  const propertiesForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertiesForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForRent: propertiesForRent?.hits,
      propertiesForSale: propertiesForSale?.hits
    }
  }
}
