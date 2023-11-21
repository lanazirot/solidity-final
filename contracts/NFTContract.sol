// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Main is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MAIN", "MAIN") {}

    string private _baseURIextended;

    function setBaseURI(string memory _baseURI) external onlyOwner () {
        _baseURIextended = _baseURI;
    }

    function _setTokenURI(uint256 _tokenID, string memory _tokenURI) internal virtual {
        require(_exists(_tokenID), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[_tokenID] = _tokenURI;
    }

    function tokenURI(uint256 _tokenID) public view virtual override returns(string memory) {
        require(_exists(_tokenID), "ERC721Metadata: URI query for nonexistent token");
        string memory _tokenURI = _tokenURIs[_tokenID];
        string memory base  = _baseURI();

        if(bytes(base).length == 0){
            return _tokenURI;
        }

        if(bytes(_tokenURI).length > 0){
            return string(abi.encodePacked(base, _tokenURI));
        }

        return string(abi.encodePacked(base, _tokenID.toString()));
    }

    function mintNFT(address _recipient, string memory _tokenURI) public onlyOwner returns(uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    } 
}
