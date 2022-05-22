import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ItemCard from "./ItemCard";
import { useGetItemsQuery } from "../../redux/slices/apiSlice";
import Pagination from "@mui/material/Pagination";

const cardWidth = 250;
const pageSize = 3;

function ItemGrid(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const { items } = props;
    console.log(items);
    let pagesAmount;
    pagesAmount = Math.ceil(items?.length / pageSize);
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const currentItemData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = currentPage * pageSize;
        return items?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, items]);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const width = matches ? cardWidth * 3 + 32 : cardWidth * 2 + 16;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            <Grid container spacing={2} sx={{ width: width }}>
                {currentItemData?.map(card => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <ItemCard card={card} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={pagesAmount}
                shape="rounded"
                page={currentPage}
                onChange={handleChangePage}
                sx={{ mt: 3 }}
            />
        </Box>
    );
}

export default ItemGrid;
