//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";
import "./../PopsicleGenesis.sol";

//
/** NOTE this contract is only used for testing purposes and is never deployed
    It needs to extend the ERC1155Holder in order to receive ERC1155 tokens
 */
contract Attacker is IERC721Receiver {
    PopsicleGenesis private immutable _mintingContract;
    address public attacker;

    constructor(address mintingContract) payable {
        _mintingContract = PopsicleGenesis(mintingContract);
        attacker = msg.sender;
    }

    function attack() external {
        _mintingContract.mint{ value: 1.0 ether }(1);
    }

    function attackPresale(bytes32[] calldata proof) external {
        _mintingContract.mintPresale{ value: 1.0 ether }(proof, 1);
    }

    function onERC721Received(
        address operator,
        address,
        uint256,
        bytes memory
    ) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
