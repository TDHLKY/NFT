// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./../PopsicleGenesis.sol";

contract PopsicleGenesisGasUsage is PopsicleGenesis {
    constructor()
        PopsicleGenesis(
            "PopsicleGenesisGasUsage",
            "PGGU",
            "ipfs://124irjof2i3jodi23jidj23i",
            0xF57B2c51dED3A29e6891aba85459d600256Cf317,
            0x6a0B823334E60b4397571dA977F221c928f98146,
            500,
            0x6a0B823334E60b4397571dA977F221c928f98146
        )
    {}

    function mintOne() external payable {
        mint(1);
    }

    function mintTwo() external payable {
        mint(2);
    }

    function mintThree() external payable {
        mint(3);
    }

    function mintFour() external payable {
        mint(4);
    }

    function mintFive() external payable {
        mint(5);
    }

    function mintTen() external payable {
        mint(10);
    }
}
