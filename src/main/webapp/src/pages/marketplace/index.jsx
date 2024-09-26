import { FilterFilled, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import FormInput from "components/form-elements/FormInput";
import HTMLRenderer from "components/HTMLRenderer";
import Loader from "components/Loader";
import MainCard from "components/MainCard";
import RenderDialog from "components/RenderDialog";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import ConnectPlatformForm from "section/marketplace/AmazonForm";
import MenuDown from "components/MenuDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";

import { useDebounce } from "hooks/useDebounce";
import TableActions from "components/TableActions";
import CustomTable from "components/Table";
import Toast from "components/Toast";
import { useNavigate } from "react-router-dom";
import {
  createAmazonStore,
  createEbayStore,
  createEtsyStore,
  createWalmartStore,
  getAllStorePlatform,
  getAllStores,
} from "services/api/setting";
import { parseURLParams } from "utils/common";
import WalmartForm from "section/marketplace/WalmartForm";
import AmazonForm from "section/marketplace/AmazonForm";

import is from "date-fns/locale/is";
import EbayForm from "section/marketplace/EbayForm";
import EtsyForm from "section/marketplace/EtsyForm";
import useAuth from "contexts/AuthContext";
const pageTitle = "Add MarketPlace";

const tableColumns = [
  {
    id: "stores",
    label: "Stores",
    render: (row) => (
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <img width={70} src={`${row?.logo}`} />
        <div>
          <div>#{row._id}</div>
          <div>{row.storeName}</div>
        </div>
      </Box>
    ),
  },

  {
    id: "lastSyncDate",
    label: "Last Sync Date",
    render: (row) => (
      <span>
        {row?.lastSyncDate
          ? format(new Date(row.lastSyncDate), "MMMM dd, yyyy")
          : "-"}
      </span>
    ),
  },
  {
    id: "createdDate",
    label: "Created Date",
    render: (row) => (
      <span>
        {row?.createdDate
          ? format(new Date(row.createdDate), "MMMM dd, yyyy")
          : "-"}
      </span>
    ),
  },

  {
    id: "status",
    label: "status",
    render: (row) => (
      <Typography variant="body1" color={row.active ? "primary" : "error"}>
        {row?.active ? "Active" : "Inactive"}
      </Typography>
    ),
  },
  {
    id: "",
    render: (row) => (
      <>
        <Stack direction="row" justifyContent="end" gap={2}>
          <TableActions paperSx={{ maxHeight: 250, overflowY: "auto" }}>
            <List>
              <ListItemButton
              // onClick={() => syncStoreServiceAPICALL(row?.ecommerceStoreId)}
              >
                <ListItemText
                  primary={<Typography variant="h6">Sync Store</Typography>}
                />
              </ListItemButton>
              <ListItemButton
              // onClick={() => getStoreDetailsAPICALL(row?.ecommerceStoreId)}
              >
                <ListItemText
                  primary={<Typography variant="h6">Edit Store</Typography>}
                />
              </ListItemButton>

              <ListItemButton
              // onClick={() => onDelete()}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" color="error.main">
                      Detach
                    </Typography>
                  }
                />
              </ListItemButton>
            </List>
          </TableActions>
        </Stack>
      </>
    ),
  },

  // {
  //   id: 'actions',
  //   label: 'Actions',
  //   align: 'right',
  //   render: (row) => {
  //     return isUpdating.toString() === row.id?.toString() ? (
  //       <Box textAlign="center">
  //         <Loader.Spinner />
  //       </Box>
  //     ) : (
  //       <Stack
  //         direction="row"
  //         alignItems="center"
  //         justifyContent="end"
  //         gap={2}
  //         onClick={(e) => {
  //           e.stopPropagation();
  //         }}
  //       >
  //         <div>
  //           <RowAction
  //             row={row}
  //             onDelete={() => deletePackageHandler(row?.id)}
  //             onStatusUpdate={(active) => updatePackageStatusHandler(row?.id, active)}
  //             onEdit={() => {
  //               setOpenEditModal(row);
  //             }}
  //           />
  //         </div>
  //       </Stack>
  //     );
  //   }
  // }
];

const breadcrumbLinks = [
  { title: "settings", to: "/settings/add-marketplace" },
  { title: pageTitle },
];
const initialModalInfo = {
  type: "",
  data: null,
};
const AddMarketPlace = () => {
  const { palette } = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(initialModalInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableFilter, setTableFilter] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const params = parseURLParams(window.location.href);
  const navigate = useNavigate();
  const [matchedFilter, setMatchedFilter] = useState("");
  const [allStoresMarket, setAllStoreMarkets] = useState([]);
  const [allStores, setAllStore] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(user, "user");
  // Initialize useForm for the form
  const { control, handleSubmit, resetField } = useForm();

  useEffect(() => {
    const fetchStoreMarket = async () => {
      setLoading(true);
      try {
        const res = await getAllStorePlatform();
        setAllStoreMarkets(res.data.stores); // Use fetched data or dummy data
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreMarket();
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const res = await getAllStores(user.id);
        setAllStore(res.data.stores); // Use fetched data or dummy data
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleConnectStoreMarket = (data) => {
    console.log(data, "data");
    if (data?.platformName === "Etsy") {
      setOpen(true);
      setModalInfo({ type: "Etsy" });
      console.log("Etsy is connecting...");
    } else if (data?.platformName === "EBay") {
      setOpen(true);
      setModalInfo({ type: "EBay" });
      console.log("Ebay is connecting...");
    } else if (data?.platformName === "Amazon") {
      setOpen(true);
      setModalInfo({ type: "Amazon", data: data.connectionParam.oAuth.url });
      console.log("Amazon is connecting");
      // window.open(data.connectionParam.oAuth.url, "_self");
    } else if (data?.platformName === "Walmart") {
      setOpen(true);
      setModalInfo({ type: "Walmart" });
      console.log("Walmart is connecting");
    } else if (data?.platformName === "Tiktok") {
      console.log("TickTok is connecting");
      // const url = `https://services.us.tiktokshop.com/open/authorize?service_id=7414733664477316869&state=xaoegsefowuf`;
      const url = `https://seller-uk.tiktok.com/services/market/custom-authorize/7414733664477316869?shop_region=GB`;

      window.open(url, "_self");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setModalInfo(initialModalInfo);
  };

  const submitEtsyFormValue = (data) => {
    resetField("etsyStore");

    const params = {
      response_type: "code",
      redirect_uri:
        "https://257c-124-29-212-38.ngrok-free.app/settings/add-marketplace",
      scope: "listings_w listings_r listings_d transactions_r transactions_w",
      client_id: "wzv7je3q5h8wdvtg5q99vfab",
      state: "superstate",
      code_challenge: "DSWlW2Abh-cf8CeLL8-g3hQ2WQyYdKyiu83u_s7nRhI",
      code_challenge_method: "S256",
    };

    const queryString = new URLSearchParams(params).toString();
    const authUrl = `https://www.etsy.com/oauth/connect?${queryString}`;

    window.open(authUrl, "_self");
    localStorage.setItem("etsyStore", JSON.stringify(data?.etsyStore));
    handleClose();
  };
  const submitEbayFormValue = (data) => {
    const authUrl = `https://auth.ebay.com/oauth2/authorize?client_id=BitsBay-delevery-PRD-182f0b312-32b6304a&response_type=code&redirect_uri=BitsBay-BitsBay-delever-ruicbgkv&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly`;
    // const authUrl = `${EBAY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=BitsBay-BitsBay-delever-cuqvwnim&scope=${SCOPES}`;
    console.log(authUrl, "authUrl");
    window.open(authUrl, "_self");
    localStorage.setItem("ebayStore", JSON.stringify(data?.ebayStore));
    handleClose();
    resetField("ebayStore");
  };
  const submitAmzFormValue = (data) => {
    localStorage.setItem("amazonStore", JSON.stringify(data?.amazonStore));
    window.open(modalInfo.data, "_self");
    handleClose();
    resetField("amazonStore");
  };
  const submitWalmartFormValue = (data) => {
    const payload = {
      client_key: data?.clientKey,
      secret_key: data?.secretKey,
      storeName: data.walmartStore,
      userId: user.id,
    };
    createWalmartStore(payload).then((res) => {
      if (res.status === 200) {
        Toast.success(res.data.successMessage);
        navigate("/settings/add-marketplace");
      }
    });
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Memoized filtered stores based on both search term and selected filters
  const filteredStoresMarket = useMemo(() => {
    // First, filter by search term
    let filteredStores = allStoresMarket?.filter((store) => {
      if (!debouncedSearchTerm) return true; // If search term is empty, return all stores
      return store.platformName
        ?.toLowerCase()
        ?.includes(debouncedSearchTerm?.toLowerCase());
    });

    // Then, filter by selected filters (platforms)
    if (selectedFilters.length > 0) {
      filteredStores = filteredStores.filter((store) =>
        selectedFilters.includes(store.id)
      );
    }

    return filteredStores;
  }, [debouncedSearchTerm, selectedFilters, allStoresMarket]);

  useEffect(() => {
    let amzStoreName = JSON.parse(localStorage.getItem("amazonStore"));
    let ebayStoreName = JSON.parse(localStorage.getItem("ebayStore"));
    let etsyStoreName = JSON.parse(localStorage.getItem("etsyStore"));

    console.log(amzStoreName, "amzStoreName");
    console.log(ebayStoreName, "ebayStoreName");
    console.log(etsyStoreName, "etsyStoreName");

    // Loop through localStorage keys

    if (
      params?.spapi_oauth_code &&
      params?.selling_partner_id &&
      amzStoreName
    ) {
      const payload = {
        authorizationCode: params?.spapi_oauth_code,
        sellerPartnerId: params?.selling_partner_id,
        storeName: amzStoreName,
        userId: user.id,
      };
      createAmazonStore(payload).then((res) => {
        if (res.status === 200) {
          Toast.success(res.data.successMessage);
          navigate("/settings/add-marketplace");
        }
      });
      localStorage.removeItem("amazonStore");
    }
    if (params?.code && ebayStoreName) {
      const payload = {
        authorizationCode: params?.code,
        expires_in: params?.expires_in,
        storeName: ebayStoreName,
        userId: user.id,
      };
      createEbayStore(payload).then((res) => {
        if (res.status === 200) {
          Toast.success(res.data.successMessage);
          navigate("/settings/add-marketplace");
        }
      });
      localStorage.removeItem("ebayStore");
    }
    if (params?.code && etsyStoreName) {
      const payload = {
        authorizationCode: params?.code,
        storeName: etsyStoreName,
        userId: user.id,
      };
      createEtsyStore(payload).then((res) => {
        if (res.status === 200) {
          Toast.success(res.data.successMessage);
          navigate("/settings/add-marketplace");
        }
      });
      localStorage.removeItem("etsyStore");
    }
  }, [params?.spapi_oauth_code, params?.selling_partner_id, params.code, user]);
  return (
    <Box>
      {modalInfo.type === "Etsy" && (
        <RenderDialog
          open={open}
          handleClose={handleClose}
          title={"Etsy"}
          maxWidth={"sm"}
          dialogActions={
            <>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(submitEtsyFormValue)}
              >
                Connect
              </Button>
            </>
          }
        >
          <EtsyForm control={control} />
        </RenderDialog>
      )}
      {modalInfo.type === "EBay" && (
        <RenderDialog
          open={open}
          handleClose={handleClose}
          title={"Ebay"}
          maxWidth={"sm"}
          dialogActions={
            <>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(submitEbayFormValue)}
              >
                Connect
              </Button>
            </>
          }
        >
          <EbayForm control={control} />
        </RenderDialog>
      )}
      {modalInfo.type === "Amazon" && (
        <RenderDialog
          open={open}
          handleClose={handleClose}
          title={"Amazon"}
          maxWidth={"sm"}
          dialogActions={
            <>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(submitAmzFormValue)}
              >
                Connect
              </Button>
            </>
          }
        >
          <AmazonForm control={control} />
        </RenderDialog>
      )}
      {modalInfo.type === "Walmart" && (
        <>
          <RenderDialog
            open={open}
            handleClose={handleClose}
            title={"Walmart"}
            maxWidth={"sm"}
            dialogActions={
              <>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(submitWalmartFormValue)}
                >
                  Connect
                </Button>
              </>
            }
          >
            <WalmartForm control={control} />
          </RenderDialog>
        </>
      )}

      <Grid container spacing={1}>
        <Grid item xs={12} sm={9}>
          <Breadcrumbs custom heading={pageTitle} links={breadcrumbLinks} />
        </Grid>
        {/* <Grid item xs={12} sm={3} textAlign="end">
          <Button
            color="primary"
            variant="contained"
            startIcon={<PlusOutlined />}
          >
            Add more stores
          </Button>
        </Grid> */}
        <Grid item xs={12}>
          <MainCard border={false} boxShadow>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "end", sm: "center" }}
                gap={2}
              >
                <Box sx={{ flexGrow: "1", width: "100%" }}>
                  <FormInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    }
                  />
                </Box>

                {/* <Stack
                  direction="row"
                  gap={2}
                  justifyContent={{ md: "end", sm: "start" }}
                  alignItems="center"
                  flexWrap={{ xs: "wrap", sm: "nowrap" }}
                >
                  <MenuDown
                    menuType="multiple"
                    titleIcon={<FilterFilled />}
                    title={"Filter"}
                    options={allStoresMarket}
                    filterKey="platform"
                    valKey="id"
                    imgKey="logo"
                    labelKey="platformName"
                    selectedItems={tableFilter?.platform || []}
                    setSelectedFilters={setSelectedFilters}
                    onSelectionChange={(updatedPlatform) => {
                      setTableFilter((prev) => ({
                        ...prev,
                        platform: updatedPlatform,
                      }));
                      setSelectedFilters(updatedPlatform); // Update selected filters
                    }}
                  />
                </Stack> */}
              </Stack>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>

      {loading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <Loader />
          <Loader.Spinner />
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent={"center"}
        >
          {filteredStoresMarket?.map((storeMarket) => {
            const matchedStores = allStores.filter((store) => {
              // Replace spaces with underscores in storeType for comparison
              const formattedStoreType = store.platformName;
              const formattedPlatformName = storeMarket.platformName;

              return formattedStoreType === formattedPlatformName;
            });
            console.log(matchedStores, "matchStore");
            return (
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                key={storeMarket.id}
              >
                <MainCard>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{ mb: 2 }}
                  >
                    <Box>
                      <img width="70px" src={storeMarket?.logo} />
                    </Box>
                    <Box>
                      <Button
                        onClick={() => handleConnectStoreMarket(storeMarket)}
                        variant="contained"
                        startIcon={
                          matchedStores.length > 0 ? <PlusOutlined /> : null
                        }
                      >
                        {matchedStores.length > 0
                          ? "Connect New Store"
                          : "Connect"}
                      </Button>
                    </Box>
                  </Stack>
                  <Typography sx={{ mb: 1 }} variant="h5">
                    {storeMarket?.platformName}
                  </Typography>
                  <Typography sx={{ mb: 1 }} variant="h6">
                    {storeMarket?.storeDescription}
                  </Typography>

                  {storeMarket?.instruction && (
                    <>
                      <Alert
                        variant="outlined"
                        severity="primary.main"
                        icon={false}
                        sx={{
                          boxShadow: 3,
                          backgroundColor: "primary.lighter",
                          display: "block",
                          border: `2px solid ${palette.primary.main}`,
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                          <AlertTitle
                            sx={{ fontWeight: 600, color: "primary.main" }}
                          >
                            Instruction
                          </AlertTitle>
                          <HTMLRenderer htmlString={storeMarket?.instruction} />
                        </Typography>
                      </Alert>
                    </>
                  )}

                  {matchedStores.length > 0 && (
                    <Accordion sx={{ marginTop: "16px" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>{storeMarket?.platformName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <CustomTable
                          id="stores-listing"
                          allowColumnReorder
                          columns={tableColumns}
                          payload={{
                            data: {
                              search: debouncedSearchTerm,
                            },
                          }}
                          tableData={matchedStores} // Use matchedStores instead of allStores
                          idLabel="id"
                          showTableAction={false}
                          pagination={false}
                          tableLoading={loading}
                        />
                      </AccordionDetails>
                    </Accordion>
                  )}
                </MainCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default AddMarketPlace;
