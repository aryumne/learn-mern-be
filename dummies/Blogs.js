import moment from "moment";
import 'moment/locale/id.js';
const Blogs = [
    {
        id: 1,
        slug: 'first-blog',
        title: "First Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        created_at: moment().format('LL'),
        author: "author-one"
    },
    {
        id: 2,

        slug: 'second-blog',
        title: " Second Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unn printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        created_at: moment().format('LL'),
        author: "author-two"
    },
    {
        id: 3,
        slug: 'third-blog',
        title: "Third Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unn printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        created_at: moment().format('LL'),
        author: "author-one"
    },
    {
        id: 4,
        slug: 'fourth-blog',
        title: "Fourth Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unn printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        created_at: moment().format('LL'),
        author: "author-one"
    },
    {
        id: 5,
        slug: 'fifth-blog',
        title: "Fifth Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unn printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        created_at: moment().format('LL'),
        author: "author-two",
    },
];

export default Blogs;