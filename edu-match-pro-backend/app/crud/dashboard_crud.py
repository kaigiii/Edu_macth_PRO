import uuid
import asyncio
from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from app.models.need import Need, NeedStatus
from app.models.donation import Donation, DonationStatus


async def get_school_dashboard_stats(session: AsyncSession, school_id: uuid.UUID) -> Dict[str, Any]:
    """獲取學校儀表板統計數據"""
    
    # 並行查詢所有統計數據
    total_needs_result, active_needs_result, completed_needs_result, students_benefited_result = await asyncio.gather(
        # 查詢總需求數
        session.execute(
            select(func.count(Need.id)).where(Need.school_id == school_id)
        ),
        # 查詢活躍需求數
        session.execute(
            select(func.count(Need.id)).where(
                Need.school_id == school_id,
                Need.status == NeedStatus.active
            )
        ),
        # 查詢已完成需求數
        session.execute(
            select(func.count(Need.id)).where(
                Need.school_id == school_id,
                Need.status == NeedStatus.completed
            )
        ),
        # 查詢受益學生數（已完成需求的學生數總和）
        session.execute(
            select(func.coalesce(func.sum(Need.student_count), 0)).where(
                Need.school_id == school_id,
                Need.status == NeedStatus.completed
            )
        )
    )
    
    # 提取結果
    total_needs = total_needs_result.scalar() or 0
    active_needs = active_needs_result.scalar() or 0
    completed_needs = completed_needs_result.scalar() or 0
    students_benefited = students_benefited_result.scalar() or 0
    
    return {
        "totalNeeds": total_needs,
        "activeNeeds": active_needs,
        "completedNeeds": completed_needs,
        "studentsBenefited": students_benefited
    }


async def get_company_dashboard_stats(session: AsyncSession, company_id: uuid.UUID) -> Dict[str, Any]:
    """獲取企業儀表板統計數據"""
    
    # 並行查詢所有統計數據
    completed_projects_result, students_helped_result, sdg_contributions_result = await asyncio.gather(
        # 查詢已完成專案數
        session.execute(
            select(func.count(Donation.id)).where(
                Donation.company_id == company_id,
                Donation.status == DonationStatus.completed
            )
        ),
        # 查詢幫助的學生數（已完成捐贈對應的需求學生數總和）
        session.execute(
            select(func.coalesce(func.sum(Need.student_count), 0))
            .select_from(Donation)
            .join(Need, Donation.need_id == Need.id)
            .where(
                Donation.company_id == company_id,
                Donation.status == DonationStatus.completed
            )
        ),
        # 查詢 SDG 貢獻統計
        session.execute(
            select(Need.sdgs)
            .select_from(Donation)
            .join(Need, Donation.need_id == Need.id)
            .where(Donation.company_id == company_id)
        )
    )
    
    # 提取結果
    completed_projects = completed_projects_result.scalar() or 0
    students_helped = students_helped_result.scalar() or 0
    
    # 處理 SDG 貢獻統計
    sdg_contributions = {}
    sdg_results = sdg_contributions_result.scalars().all()
    for sdg_list in sdg_results:
        for sdg in sdg_list:
            sdg_contributions[str(sdg)] = sdg_contributions.get(str(sdg), 0) + 1
    
    return {
        "completedProjects": completed_projects,
        "studentsHelped": students_helped,
        "totalDonation": 0,  # 暫時回傳模擬數據
        "volunteerHours": 0,  # 暫時回傳模擬數據
        "sdgContributions": sdg_contributions
    }
