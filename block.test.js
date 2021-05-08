const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe('Block', () => {
    const timestamp = 'a-data';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({ timestamp, lastHash, hash, data });

    it('has a timestamp', () => {
        expect(block.timestamp).toEqual(timestamp)
    })

    it('has a lastHash', () => {
        expect(block.lastHash).toEqual(lastHash)
    })

    it('has a hash', () => {
        expect(block.hash).toEqual(hash)
    })

    it('has data', () => {
        expect(block.data).toEqual(data)
    })

    it('has 2 entries in the data field ', () => {
        expect(block.data).toHaveLength(2)
    })

    it('can get a data entry by index', () => {
        expect(block.data[0]).toEqual('blockchain')
    })

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data'
        const minedBlock = Block.mineBlock({ lastBlock, data })

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true)
        })

        it('it sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash)
        })

        it('sets the data', () => {
            expect(minedBlock.data).toEqual(data)
        })

        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined)
        })

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash)
                .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data))
        })
    })
});