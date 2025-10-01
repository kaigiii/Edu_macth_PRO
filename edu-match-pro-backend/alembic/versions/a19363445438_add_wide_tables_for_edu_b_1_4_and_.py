"""add wide tables for edu_B_1_4 and faraway3

Revision ID: a19363445438
Revises: 360780926b0d
Create Date: 2025-09-29 22:28:03.663426

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a19363445438'
down_revision: Union[str, None] = '360780926b0d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create wide table for edu_B_1_4 (mirror CSV headers)
    op.create_table(
        'wide_edu_B_1_4',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.Column('學年度', sa.Text(), nullable=False),
        sa.Column('縣市別', sa.Text(), nullable=False),
        sa.Column('幼兒園[人]', sa.Integer(), nullable=True),
        sa.Column('國小[人]', sa.Integer(), nullable=True),
        sa.Column('國中[人]', sa.Integer(), nullable=True),
        sa.Column('高級中等學校-普通科[人]', sa.Integer(), nullable=True),
        sa.Column('高級中等學校-專業群科[人]', sa.Integer(), nullable=True),
        sa.Column('高級中等學校-綜合高中[人]', sa.Integer(), nullable=True),
        sa.Column('高級中等學校-實用技能學程[人]', sa.Integer(), nullable=True),
        sa.Column('高級中等學校-進修部[人]', sa.Integer(), nullable=True),
        sa.Column('大專校院(全部計入校本部)[人]', sa.Integer(), nullable=True),
        sa.Column('大專校院(跨縣市教學計入所在地縣市)[人]', sa.Integer(), nullable=True),
        sa.Column('宗教研修學院[人]', sa.Integer(), nullable=True),
        sa.Column('國民補習及大專進修學校及空大[人]', sa.Integer(), nullable=True),
        sa.Column('特殊教育學校[人]', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('學年度', '縣市別', name='uq_wide_edu_year_county')
    )
    op.create_index(op.f('ix_wide_edu_B_1_4_year'), 'wide_edu_B_1_4', ['學年度'], unique=False)
    op.create_index(op.f('ix_wide_edu_B_1_4_county'), 'wide_edu_B_1_4', ['縣市別'], unique=False)

    # Create wide table for faraway3 (mirror CSV headers)
    op.create_table(
        'wide_faraway3',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.Column('學年度', sa.Text(), nullable=False),
        sa.Column('縣市名稱', sa.Text(), nullable=False),
        sa.Column('鄉鎮市區', sa.Text(), nullable=True),
        sa.Column('學生等級', sa.Text(), nullable=True),
        sa.Column('本校代碼', sa.Text(), nullable=False),
        sa.Column('本校名稱', sa.Text(), nullable=False),
        sa.Column('分校分班名稱', sa.Text(), nullable=False, server_default=''),
        sa.Column('公/私立', sa.Text(), nullable=True),
        sa.Column('地區屬性', sa.Text(), nullable=True),
        sa.Column('班級數', sa.Integer(), nullable=True),
        sa.Column('男學生數[人]', sa.Integer(), nullable=True),
        sa.Column('女學生數[人]', sa.Integer(), nullable=True),
        sa.Column('原住民學生比率', sa.Numeric(10, 4), nullable=True),
        sa.Column('上學年男畢業生數[人]', sa.Integer(), nullable=True),
        sa.Column('上學年女畢業生數[人]', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('學年度', '本校代碼', '分校分班名稱', name='uq_wide_faraway_year_code_branch')
    )
    op.create_index(op.f('ix_wide_faraway3_year'), 'wide_faraway3', ['學年度'], unique=False)
    op.create_index(op.f('ix_wide_faraway3_county'), 'wide_faraway3', ['縣市名稱'], unique=False)
    op.create_index(op.f('ix_wide_faraway3_code'), 'wide_faraway3', ['本校代碼'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_wide_faraway3_code'), table_name='wide_faraway3')
    op.drop_index(op.f('ix_wide_faraway3_county'), table_name='wide_faraway3')
    op.drop_index(op.f('ix_wide_faraway3_year'), table_name='wide_faraway3')
    op.drop_table('wide_faraway3')

    op.drop_index(op.f('ix_wide_edu_B_1_4_county'), table_name='wide_edu_B_1_4')
    op.drop_index(op.f('ix_wide_edu_B_1_4_year'), table_name='wide_edu_B_1_4')
    op.drop_table('wide_edu_B_1_4')
