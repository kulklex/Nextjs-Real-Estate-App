import { useState, useEffect } from "react";
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {MdCancel} from 'react-icons/md'
import Image from "next/image";
import { filterData, getFilterValues } from '../utils/filterData'



export const SearchFilters = () => {
    const router = useRouter()
    const [filters, setFilters] = useState(filterData)

    const searchProperties = (filterValues) => {
        const path = router.pathname
        const { query } = router

        const values = getFilterValues(filterValues)

        values.forEach((item) => {
            if(item.value && filterValues?.[item.name]){
                // To make sure we adding only the filters that are selected are the ones added to the search query
                query[item.name] = item.value
            }
        })

        router.push({pathname: path, query})
    }


    return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
        {
            filters?.map((filter) => (
                <Box key={filter?.queryName}>
                    <Select
                    onChange={(e) => searchProperties({[filter?.queryName]: e.target.value})}
                    w="fit-content" p="2"
                    placeholder={filter?.placeholder}>
                        {filter?.items?.map((item) => (
                            <option key={item?.value} value={item?.value}>
                                {item?.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))
        }
    </Flex>)
}