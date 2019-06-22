import Datastore from 'nedb-promise';
import path from 'path';

const createFutureDate = (daysInTheFuture) => {
    const DAY_IN_MILLI_SECONDS = 24 * 60 * 60 * 1000;
    return new Date(Date.now() + daysInTheFuture * DAY_IN_MILLI_SECONDS);
}

const randPriority = () => Math.floor(1 + Math.floor(4 * Math.random()))

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fixtures = [
    {
        created: new Date(),
        title: 'Hallo Welt',
        description: 'Use find to look for multiple documents matching you query, or findOne to look for one specific document. You can select documents based on field equality or use comparison operators ($lt, $lte, $gt, $gte, $in, $nin, $ne). You can also use logical operators $or, $and, $not and $where. See below for the syntax.',
        done: undefined,
        due: null,
        priority: randPriority(),
    },

    {
        created: new Date(),
        title: 'Dies ist ein test',
        description: 'Use find to look for multiple documents matching you query, or findOne to look for one specific document. You can select documents based on field equality or use comparison operators ($lt, $lte, $gt, $gte, $in, $nin, $ne). You can also use logical operators $or, $and, $not and $where. See below for the syntax.',
        done: undefined,
        due: null,
        priority: randPriority(),
    },

    {
        created: new Date(),
        title: 'Salz einakufen',
        description: 'Salzz ist alle',
        done: new Date(),
        due: createFutureDate(3),
        priority: randPriority(),
    },
];


const db = new Datastore({filename: path.join(__dirname, 'test.db'), autoload: true});

fixtures.forEach(async (fixture) => {
    await db.insert(fixture);
});