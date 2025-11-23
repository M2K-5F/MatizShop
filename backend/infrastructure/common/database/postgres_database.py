from contextlib import asynccontextmanager
from datetime import datetime
import asyncpg
from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker, AsyncEngine
from sqlalchemy.orm import DeclarativeBase
from dotenv import dotenv_values, load_dotenv
import os


class Database():
    engine: AsyncEngine
    session: async_sessionmaker[AsyncSession]

    def __init__(self, name: str, host: str = 'env', port: str = 'env', user: str = 'env', password: str = 'env', max_connections: int = 12, max_overflow: int = 4):
        try:
            self.env = dotenv_values()
            self.user = self.env['DB_USER'] if user == 'env' else user
            self.host = self.env['DB_HOST'] if host == 'env' else host
            self.port = self.env['DB_PORT'] if port == 'env' else port
            self.password = self.env['DB_PASSWORD'] if password == 'env' else password
            self.name = name
            self.max_conn = int(str(self.env.get("MAX_CONNECTIONS", max_connections)))
            self.max_overflow = int(str(self.env.get("MAX_OVERFLOW", max_overflow)))
            
        except:
            if (name == 'env' or
                host == 'env' or 
                port == 'env' or
                user == 'env' or
                password == 'env'
            ):
                raise ValueError('Error loading dotenv')

            else:
                self.user = user
                self.host = host
                self.port = port
                self.password = password
                self.name = name

    async def create_database(self):
        try:
            conn = await asyncpg.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.name
            )

            await conn.execute(f'CREATE DATABASE "{self.name}"')
            await conn.close()
            
        except Exception as e:
            raise


    async def check_database_exists(self) -> bool:
        try:
            conn = await asyncpg.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=self.name
            )
            
            exists = await conn.fetchval(
                "SELECT 1 FROM pg_database WHERE datname = $1", 
                self.name
            )
            
            await conn.close()
            return exists is not None
            
        except Exception as e:
            return False


    async def database_init(self):
        if not await self.check_database_exists():
            await self.create_database()

        URL = f"postgresql+asyncpg://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"
        engine = create_async_engine(
            URL,
            pool_size=self.max_conn,   
            max_overflow=self.max_overflow,
            pool_timeout=30,
            pool_recycle=1800,
            pool_pre_ping=True,
            echo=False
        )

        self.engine = engine
        async_session = async_sessionmaker(
            self.engine,
            class_= AsyncSession,
            expire_on_commit=False
        )

        self.session = async_session

    
    @asynccontextmanager
    async def atomic(self):
        async with self.session() as session:
            try:
                async with session.begin():
                    yield session
                    print("Atomic transaction completed successfully")
            except Exception as e:
                print("Atomic transaction failed:", e)
                raise

    class Table(DeclarativeBase):
        id = Column(Integer, primary_key=True, index=True)
        created_at = Column(DateTime, default=datetime.now().replace(microsecond=0))