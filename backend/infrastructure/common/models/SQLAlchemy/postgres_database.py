from contextlib import asynccontextmanager
from datetime import datetime
import asyncpg
from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker, AsyncEngine
from sqlalchemy.orm import DeclarativeBase



class Database():
    engine: AsyncEngine
    session: async_sessionmaker[AsyncSession]

    async def create_database(self, db_name: str):
        try:
            conn = await asyncpg.connect(
                user='postgres',
                password='kkm228822mkk',
                host='localhost',
                port=5432,
                database='postgres'
            )

            await conn.execute(f'CREATE DATABASE "{db_name}"')
            await conn.close()
            
        except Exception as e:
            raise


    async def check_database_exists(self, db_name: str) -> bool:
        try:
            conn = await asyncpg.connect(
                user='postgres',
                password='kkm228822mkk',
                host='localhost',
                port=5432,
                database='postgres'
            )
            
            exists = await conn.fetchval(
                "SELECT 1 FROM pg_database WHERE datname = $1", 
                db_name
            )
            
            await conn.close()
            return exists is not None
            
        except Exception as e:
            return False


    async def database_init(self, db_name: str):
        if not await self.check_database_exists(db_name):
            await self.create_database(db_name)

        URL = f"postgresql+asyncpg://postgres:kkm228822mkk@localhost:5432/{db_name}"
        engine = create_async_engine(
            URL,
            pool_size = 20
        )

        self.engine = engine
        async_session = async_sessionmaker(
            self.engine,
            class_= AsyncSession,
            expire_on_commit=False
        )
        self.session = async_session

    
    @asynccontextmanager
    async def get_session(self):
        async with self.session() as session:
            yield session


    class Table(DeclarativeBase):
        id = Column(Integer, primary_key=True, index=True)
        created_at = Column(DateTime, default=datetime.now().replace(microsecond=0))