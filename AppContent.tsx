
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

import { HomeScreen } from './components/WalletConnector';
import { Collection } from './components/Collection';
import { OkeCreator } from './components/OkeCreator';
import { ItemDetail } from './components/ItemDetail';
import { MintingModal } from './components/MintingModal';

const AppContent: React.FC = () => {
    const { state } = useContext(AppContext);
    const { view, web3State, selectedItem, networkError, mintingData } = state;

    const renderView = () => {
        switch(view) {
            case 'home':
                return <HomeScreen />;
            case 'collection':
                return <Collection />;
            case 'creator':
                return <OkeCreator />;
            case 'detail':
                return selectedItem ? <ItemDetail item={selectedItem} /> : <Collection />;
            default:
                return <HomeScreen />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center p-4 bg-black font-sans">
            {networkError && web3State.address && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-3 text-center text-base z-50 font-semibold">
                    {networkError}
                </div>
            )}
            <div className="w-full max-w-5xl mx-auto">
                {renderView()}
            </div>
            {mintingData.isOpen && <MintingModal />}
        </div>
    );
};

export default AppContent;
