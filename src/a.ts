//create user and post together
 await prisma.user.create({
	     data: {
		     email: "hello@gmail.com",
		     name: "hello",
		     posts: {
			     create: [
				     {
					     title: "hello title1"
				     },
				     {
					     title: "hello  title2"
				     },
			     ]
		     }
	     }
	    
 })

 //find queries
 
const users = await prisma.user.findMany({});
    console.log(users);
        const user = await prisma.user.findUnique({
		where: {
			id: 1
		},
		include: {
			posts: true
		}
	})
	console.log(user);

//
const posts = await prisma.post.findMany({
	include: {
		author: {
			select: {
				email: true
			}
		}
	}	
});

//LOGS QUERIES
const prisma = new PrismaClient({log: ['info', 'query'],})

//update user
await prisma.user.update({
	    where: {
		    id: 1
	    },
	    data: {
		    name: "hello"
	    }
})

//delete query
await prisma.user.update({
    where: {
        id: 1
    },
    data: {
        posts: {
            deleteMany: {
                published: false
            }
        }
    }
  })

//FILTERING

let res = await prisma.user.findMany({
    where: {
        email: {
          endsWith: 'gmail.com',
        },
        posts: {
          /// Has atleast one post published
          some: {
            published: true,
          },
        },
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
    })
    console.log(res);

//pagination
let res = await prisma.post.findMany({
    take: 3
  })
    console.log(res); 
