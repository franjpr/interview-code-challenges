import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PhoneCatalogueComponent } from './phone-catalogue.component';
import { PhoneVm } from "./phones.vm";
import { State } from "../../app.state";
import { connect } from "react-redux";
import { updatePhonesCollection, updateLoadingStatus } from "./store/actions";
import * as api from './phones.api'

interface Props extends RouteComponentProps {
    setPhonesCollection: (phones: PhoneVm[]) => void,
    phonesCollection: PhoneVm[],
    isLoading: boolean,
    setLoading: (value: boolean) => void,
}

const mapStateToProps = (state: State): Partial<Props> => ({
    phonesCollection: state.phonesCatalogueState.phoneCollection,
    isLoading: state.phonesCatalogueState.isLoading
})

const mapDispatchToProps = (dispatch): Partial<Props> => ({
    setPhonesCollection: (phones: PhoneVm[]) => dispatch(updatePhonesCollection(phones)),
    setLoading: (value: boolean) => dispatch(updateLoadingStatus(value))
})

const PhoneCatalogueInnerContainer = (props: Props) => {
    const {
        phonesCollection,
        setPhonesCollection,
        isLoading,
        setLoading
    } = props;

    const getPhonesCollection = () => {
        setLoading(true);
        api.getPhones()
            .then(response => {
                setPhonesCollection(response.data)
            }).finally(() => {
                setLoading(false);
            })
    }

    React.useEffect(() => {
        getPhonesCollection();
    }, [])

    return (
        <>
            <PhoneCatalogueComponent phonesCollection={phonesCollection} isLoading={isLoading}></PhoneCatalogueComponent>
        </>);
};

export const PhoneCatalogueContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(PhoneCatalogueInnerContainer));
