import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { BarDashboard } from "../components/BarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { amountFormatter } from "../../helpers/amountFormatter";
import { Add, Delete, Remove } from "@mui/icons-material";
import { startDeletingCheckoutArticle, startDeletingCheckoutArticlesStock } from "../../store/checkout/thunks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { startUpdateArticlesStock } from "../../store/StoreStyle/thunks";

export const CheckOut = () => {

  const dispatch = useDispatch();
  const { checkoutArticles } = useSelector((state) => state.checkout);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState([...checkoutArticles]);

  const navigate = useNavigate();

  const addTotals = () => {
    if(!articles) return;
    const subtotal = articles.reduce((acum, article) =>  acum + parseInt(article.subTotal), 0) || 0;
    const totaltax = articles.reduce((acum, article) => acum + article.totalTax, 0) || 0;
    const total = subtotal + totaltax;
    setSubtotal(subtotal);
    setTax(totaltax);
    setTotal(total);
  };

  useEffect(() => {
    setArticlesOperations();
    addTotals();
  }, [checkoutArticles]);

  useEffect(() => {
    addTotals();
  }, [articles])
  

  
  const deleteCheckout = (id) => {
    Swal.fire({
      title:'Deleted!',
      text: 'Your article has been deleted.',
      icon:'success'
  });
    dispatch( startDeletingCheckoutArticle(id))
  }
  
  const setArticlesOperations = () => {
    
    const newArticles = checkoutArticles.map((article) => {
      
      const subTotal = parseInt(article.quantity) * parseInt(article.price);
      const totalTax = article.price * (article.tax / 100);   
      return {...article, requestQuantity: 1, subTotal, totalTax };
      
    });
    setArticles(newArticles);
  };
  
  const increment = (id) => {
    let invalidIncrement = false;
    const incrementedArticleArray = articles.map( article => {
      if (article.id === id) {
        const quantity = parseInt(article.quantity) + 1;
        if (quantity > article.stock) invalidIncrement = true;
        const subTotal = quantity * parseInt(article.price);
        const totalTax = article.price * ((parseInt(article.tax) * quantity) / 100); 
        return {...article, quantity: quantity, subTotal, totalTax }
      }
      return {...article};
    });
    if (invalidIncrement === true) return;
    setArticles(incrementedArticleArray);
  };

  const decrement = (id) => {
    let invalid = false;
    const incrementedArticleArray = articles.map( article => {
      if (article.id === id) {
        const quantity = parseInt(article.quantity) - 1;
        if (quantity < 1) invalid = true;
        const subTotal = quantity * parseInt(article.price);
        const totalTax = article.price * ((parseInt(article.tax) * quantity) / 100); 
        return {...article, quantity: quantity, subTotal, totalTax }
      } else {
        return {...article};
      }

    });
    if (invalid === true) return;
    setArticles(incrementedArticleArray);
  };
  
  useEffect(() => {
    if(checkoutArticles) {
      setArticlesOperations();
    }
  }, [checkoutArticles])

  const onOrderCompleted = (details) => {
    if (details.status !== 'COMPLETED') {
      Swal.fire('Order Canceled');
      return;
    }


    handleDeleteToUpdateArticlesAndClearCheckoutArticles();

    const name = details.payer.name.given_name; 
    alert(`Transaction completed by ${name}`);
    navigate('/home');

  }

  const handleDeleteToUpdateArticlesAndClearCheckoutArticles = () => {
    const ids = articles.map( (article) => article.id);
    dispatch(startDeletingCheckoutArticlesStock(ids));
    let articlesToUpdate = articles.map( article => {
      const newArticle = {
        id: article.referenceId,
        title: article.title,
        price: article.price,
        description: article.description,
        quantity: 1,
        stock: article.stock - article.quantity,
        tax: article.tax,
        category: article.category,
        imageUrls: article.imageUrls,
      }
      return newArticle;
    });
    dispatch(startUpdateArticlesStock(articlesToUpdate));
  };
  
  return (
    <Box>
      <BarDashboard />

      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: '100%' }}>
        <List
          sx={{ mt: 12, p: 2, width: '100%', maxHeight: '800px', overflow: 'auto' }}
          subheader={
            <ListSubheader sx={{ fontSize: "18px", fontWeight: 500 }}>
              Articles List
            </ListSubheader>
          }
        >
          {articles.map((article, i) => (
            <ListItem key={i} sx={{ borderBottom: "1px solid gray", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              <ListItemAvatar sx={{ height: "90px", mr: 2 }}>
                <Avatar
                  sx={{ height: "80px", width: "80px", borderRadius: "10px" }}
                  alt="hola"
                  src={article.imageUrls[0] || ""}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{ width: "40px" }}
                id="article-list-label-1"
                primary={article.title}
              />
              <Box component='p' sx={{ fontWeight: 700 }}>{amountFormatter( article.price )}</Box>
              <Box component='p' sx={{ fontWeight: 700 }}>
              <IconButton sx={{ cursor: 'pointer' }} onClick={() => decrement(article.id)}>
                  <Remove />
                </IconButton>
                {article.quantity}
                <IconButton onClick={() => increment(article.id)}>
                  <Add />
                </IconButton>
              </Box>
              <Box component='p' sx={{ fontWeight: 700 }}>{amountFormatter( article.subTotal )}</Box>
              <IconButton onClick={ () => deleteCheckout(article.id) }>
                  <Delete sx={{ fontSize: 30 }} />
                </IconButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 12, p: 2, width: '40%', borderLeft: '1px solid gray' }}>
          <Typography variant="h5">Order</Typography>
          <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>Subtotal</Box>
            <Box sx={{ fontWeight: 700 }}>{amountFormatter(subtotal)}</Box>
          </Box>
          <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>Total Tax</Box>
            <Box sx={{ fontWeight: 700 }}>{amountFormatter(tax)}</Box>
          </Box>
          <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>Total</Box>
            <Box sx={{ fontWeight: 700 }}>{amountFormatter(total)}</Box>
          </Box>
          
          <PayPalScriptProvider
          options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
        >
          <PayPalButtons
              style={{ layout: "vertical", label: "buynow", shape: "rect" }} 
              disabled={ total == 0 ?? true }
              forceReRender={[total]}
              createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                               value: total.toFixed(2),
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                  onOrderCompleted(details);

              });
          }}
          />
        </PayPalScriptProvider>
        </Box>
      </Box>
    </Box>
  );
};
