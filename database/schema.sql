CREATE TABLE "posts" (
	"postId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"theme" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);
