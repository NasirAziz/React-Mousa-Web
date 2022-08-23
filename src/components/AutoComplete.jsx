import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { createFilterOptions } from '@mui/material';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {

    const { data, index, style } = props;
    const dataSet = data[index];
    { console.log(data) }

    const inlineStyle = {
        ...style,
        top: style.top + LISTBOX_PADDING,
        height: 100
    };

    // if (dataSet.hasOwnProperty('group')) {
    //     return (
    //         <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
    //             {dataSet.group}
    //         </ListSubheader>
    //     );
    // }

    return (
        <div  {...dataSet[0]} style={{ flexDirection: "column" }}  >
            {/* <Box style={{ flexDirection: "column", height: 100 }} {...dataSet[0]} component="li"> */}
            <p style={{ fontWeight: "bold", marginBottom: "0", marginTop: "0" }}>{dataSet[1].first_name + " " + dataSet[1].last_name + " "}</p>
            <p style={{ marginBottom: "0", marginTop: "0" }}>{" " + dataSet[1].phone + " "}</p>
            <p style={{ marginBottom: "0", marginTop: "0" }}>{" " + dataSet[1].email + " "}</p>
            {/* </Box> */}
            {/* {console.log(JSON.stringify(...dataSet[1]))} */}
            {/* <Box style={{ flexDirection: "column" }} component="li" {...props}>
                <p style={{ fontWeight: "bold", marginBottom: "10", marginTop: "10" }}>{dataSet.props.children[0].props.children}</p>
                <p style={{ marginBottom: "10", marginTop: "10" }}> {dataSet.props.children[0].props.children} </p>
                <p style={{ marginBottom: "10", marginTop: "10" }}> {dataSet.props.children[2].props.children[1]}</p>
            </Box> */}

        </div>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });

    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 12 * itemSize;//8
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    // innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={6}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.array,
};

// function random(length) {
//     const characters =
//         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';

//     for (let i = 0; i < length; i += 1) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }

//     return result;
// }

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});

// const OPTIONS = Array.from(new Array(10000))
//     .map(() => random(10 + Math.ceil(Math.random() * 20)))
//     .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.phone + option.email,
});


export default function AutoCompleteVirtualize({ options, onChange, onChange2 }) {

    return (
        <Autocomplete
            id="virtualize-demo"
            sx={{ width: "80%" }}
            disableListWrap
            onChange={onChange2}
            PopperComponent={StyledPopper}
            filterOptions={filterOptions}
            ListboxComponent={ListboxComponent}
            options={options}
            getOptionLabel={(option) => option.phone}
            // groupBy={(option) => option.phone.toUpperCase()}

            renderInput={(params) => <TextField {...params} label="Phone or Email" onChange={onChange} />}
            renderOption={(props, option) => [props, option]}
            // renderOption={(props, option) => (
            //     <Box style={{ flexDirection: "column" }} component="li" key={option.phone} {...props}>
            //         <p style={{ fontWeight: "bold", marginBottom: "0px", marginTop: "0px" }}>{option.first_name + " " + option.last_name}</p>
            //         {/* <br></br> */}
            //         <p style={{ marginBottom: "0", marginTop: "0px" }}> {option.email} </p>
            //         {/* <br></br> */}
            //         <p style={{ marginBottom: "0", marginTop: "0px" }}> {option.phone}</p>
            //     </Box>
            // )}
            // TODO: Post React 18 update - validate this conversion, look like a hidden bug
            renderGroup={(params) => params}
        />
    );
}
